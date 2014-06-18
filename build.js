var _fs = require("fs");
var _glob = require("glob");
var markdownpdf = require("markdown-pdf");

var markdownDest = "compiled/contract.md";
var pdfDest = "compiled/contract.pdf";
var srcGlob = "src/*.md";

_glob(srcGlob, function(err, files){
  if(err){ throw err; }

  var mdFiles = files.map(function(filePath){
    return _fs.readFileSync(filePath).toString();
  });

  _fs.writeFile(markdownDest, mdFiles.join('\n'), function(err){
    if(err){ throw err; }

    _fs.createReadStream(markdownDest)
      .pipe(markdownpdf())
      .pipe(_fs.createWriteStream(pdfDest));
  });
});

