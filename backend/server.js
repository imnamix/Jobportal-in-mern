import app from "./app.js";
import cloudinary from "cloudinary";


cloudinary.v2.config({
  cloud_name: 'dihuskist',
  api_key: '331645624164422',
  api_secret: 'JMLVnnQ34cwqI5OVxlARWlTd8zM',
});



app.listen(4000, () => {
  console.log(`Server running at port ${4000}`);
});
