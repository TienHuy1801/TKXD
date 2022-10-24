## Available Scripts

In the project directory, you can run:

### `REACT_APP_API_ROOT=url backend npm start`

## Sử dụng alert:

import { alertService } from "../Alert/alert.service";

- thành công: alertService.success("tin nhắn");
- thông tin: alertService.info("tin nhắn");
- lỗi: alertService.error("tin nhắn");
- cảnh báo: alertService.warn("tin nhắn");
