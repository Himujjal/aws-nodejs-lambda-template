const AWS = require("aws-sdk");
const {
  lambda: { name: lambdaName },
} = require("../package.json");
const lambda = new AWS.Lambda();

/**
 * @param {string} FunctionName
 * @returns {Promise<AWS.Lambda.GetFunctionResponse>}
 * */
const checkIfFunctionExists = (FunctionName) => {
  const params = { FunctionName, Qualifier: "1" };
  return new Promise((resolve, reject) => {
    lambda.getFunction(params, (err, data) => {
      if (err) reject(err);
      else {
        resolve(data);
      }
    });
  });
};

const createFunction = ({
  FunctionName,
  Handler = "handler",
  Description = "A NodeJS lambda function",
  EnvironmentVariables = {},
  Role,
}) => {
  const params = {
    FunctionName,
    Handler,
    Runtime: "nodejs12.x",
    Description,
    Environment: {
      Variables: EnvironmentVariables,
    },
    Role,
  };
};

const deploy = () => {};

module.exports = deploy;
