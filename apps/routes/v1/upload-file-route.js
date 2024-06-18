"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileRoutes = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const express_1 = __importDefault(require("express"));
const upload_file_1 = require("../../controllers/upload-file");
const upload_file_2 = require("../../middlewares/upload-file");
// import { StatusCodes } from 'http-status-codes'
// import { CONFIG } from '../../configs'
// import { ResponseData } from '../../utilities/response'
// const checkFileSizeMidleWare = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     console.log('cehck')
//     console.log(req.file)
//     console.log(req.body)
//     if (req.file != null) {
//       const fileSizeKiloBytes = req.file.size / 1024
//       if (fileSizeKiloBytes > +CONFIG.maximumUploadFile) {
//         console.log('maksimum file 2mb')
//         throw Error('maksimum file 2mb')
//       }
//       next()
//     }
//   } catch (error: any) {
//     console.log(error)
//     const message = 'maksimum file 2mb'
//     const response = ResponseData.error(message)
//     return res.status(StatusCodes.UNAUTHORIZED).json(response)
//   }
// }
const uploadFileRoutes = (app) => {
    const router = express_1.default.Router();
    app.use('/api/v1', router);
    router.post('/upload-file/products-images', 
    // checkFileSizeMidleWare,
    upload_file_2.uploadMidleWare.single('file'), async (req, res) => await (0, upload_file_1.uploadFile)(req, res));
};
exports.uploadFileRoutes = uploadFileRoutes;
