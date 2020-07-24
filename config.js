const cloudConfig = require("./cloudConfig")

const config = {
    outDir: "output",
    iamProfile: "Mufazzal_Hussain"
}

const buildArgsString = (args) => {

    return  ` --stage ${cloudConfig.stage}` +
            ` --region ${cloudConfig.region}` + 
            ` --userPoolArn ${cloudConfig.userPoolArn}` +
            ` --commonLibArn ${cloudConfig.commonLibArn}` + 
            ` --userTableArn ${cloudConfig.userTableArn}` + 
            ` --iamProfile ${config.iamProfile}` + 
            ` --userTableName ${cloudConfig.userTableName}`;
}

const buildRunFunEnvString = (args) => {

    const [functionName] = args

    switch (functionName) {
        case "getUsers":
            return ` --env UserTableName=${cloudConfig.userTableName}`
        default:
            return ''
    }

}



module.exports = {config, buildArgsString, buildRunFunEnvString};