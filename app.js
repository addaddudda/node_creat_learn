let express = require('express');
let app = express();
app.listen(3000, function(){
    console.log('http://localhost:3000');
})
app.get