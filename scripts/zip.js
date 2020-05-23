const fs = require("fs");
const { resolve } = require("path");
const archiver = require("archiver");

const {
  lambda: { name: lambdaFuncName },
} = require("../package.json");

const zipFile = () => {
  const output = fs.createWriteStream(
    resolve(__dirname, "..", `${lambdaFuncName}.zip`)
  );
  const archive = archiver("zip", { zlib: { level: 9 } });

  output.on("close", () => {
    console.log(archive.pointer() + " total-bytes");
  });

  output.on("end", () => {
    console.log("Data has been drained");
  });

  archive.on("warning", (err) => {
    if (err.code === "ENOENT") {
      console.log("WARNING: ENOENT", "");
    } else {
      throw err;
    }
  });

  archive.on("error", (err) => {
    throw err;
  });

  archive.pipe(output);

  const files = fs.readdirSync(resolve(__dirname, "../dist")).map((file) => ({
    path: resolve(__dirname, "../dist/", file),
    fileName: file,
  }));

  files.forEach((file) => {
    archive.append(fs.createReadStream(file.path), { name: file.fileName });
  });

  archive.finalize();
};

module.exports = zipFile;
