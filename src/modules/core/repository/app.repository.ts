import { Model } from 'mongoose';
import { FindOptions } from 'sequelize';
import { SequelizeOptions } from 'sequelize-typescript/dist/sequelize/sequelize/sequelize-options';
import { IDataTableOptions } from '../typing/datatableOptions.type';

interface IRepositoryOptions {
  model: Model<any>;
  canSearchField?: string[]
  datatableOptions?: any
  getAllOptions?: FindOptions
  getOptions?: FindOptions
}

class AppRepository {
  public static options: IRepositoryOptions;
  public static get Options(): IRepositoryOptions {
    return (this as any).options;
  }
  public static get Model(): Model<any> {
    return (this as any).options.model;
  }

  public static async get(id: string) {
    return this.Model.findOne({ where: { id }, ...this.Options.getOptions });
  }
  public static async create(payload: Map<any, any>): Promise<any> {
    const data = await this.Model.create({
      ...payload,
    });
    return data
  }
  public static async datatable(
    userId: String,
    datatableOptions: IDataTableOptions = { limit: '5', page: '1', search: '' },
  ) {
    const offset = parseInt(datatableOptions.limit, 10) * (parseInt(datatableOptions.page, 10) - 1);
    const limit = parseInt(datatableOptions.limit, 10);
    // let where = {};
    // if (this.Options.canSearchField.length > 0) {
    //   where = {
    //     ...where,
    //     [Op.or]: this.Options.canSearchField.map((el: string) => {
    //       return {
    //         [el]: {
    //           [Op.like]: `%${datatableOptions.search}%`,
    //         },
    //       };
    //     }),
    //   };
    // }
    const query = this.Model.find({ userId }).select("-photo_feature").toConstructor()
    const data = await (new query()).skip(offset).limit(limit).exec()
    this.Model.find().toConstructor()

    const count = await this.Model.estimatedDocumentCount()
    return {count, result: data};
  }
  public static async getAll(options?: SequelizeOptions) {
    // const data = await this.Model.findAll({...this.Options.getAllOptions});
    // return data;
  }

  public static async update(id: string, payload: Map<any, any>) {
    // return this.Model.update(
    //   {
    //     ...payload,
    //   },
    //   {
    //     where: { id },
    //   },
    // );
  }
  public static async delete(id: string) {
    // return this.Model.update({ deletedAt: moment().format('YYYY/MM/DD') }, { where: { id } });
  }
}

export { AppRepository, IRepositoryOptions };

