import { ResponseService } from "../service/response.service";

interface ControllerOptions {
  repository: any;
}
class AppController {
  static repository: any;

  constructor(options: ControllerOptions) {
    AppController.repository = options.repository;
  }
  async get(req: any, res: any) {
    // const data = await AppController.repository.get(req.params.id);
    // res.json(data);
  }
  async datatable(req: any, res: any) {
    // const page = req.query.page || '1';
    // const limit = req.query.limit || '15';
    // const search = req.query.search || '';
    // const data = await AppController.repository.datatable({ page, limit, search });
    // res.json(data);
  }
  async getAll(req: any, res: any) {
    // const data = await AppController.repository.getAll();
    // res.json(data);
  }
  async create(req: any, res: any) {
    const data = await AppController.repository.create(req.body);
    ResponseService.success(res, data, "Berhasil membut user")
  }
  async update(req: any, res: any) {
    const data = await AppController.repository.update(req.user, req.params.id, req.body);
    res.json(data);
  }
  async delete(req: any, res: any) {
    const data = await AppController.repository.delete(req.user);
    res.json(data);
  }
}

export { AppController };
