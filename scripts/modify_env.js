exports.modify_env = function (key,value) {
  const fs = require('fs');

  // 1. 读取.env文件
  const envFilePath = '.env';
  const currentEnvContent = fs.readFileSync(envFilePath, 'utf-8');
  
  // 2. 修改变量的值（假设MY_VARIABLE是一个键值对）
  const targetVariable = key;
  const newValue = value;
  
  // 将当前内容解析为键值对对象
  const envObject = currentEnvContent
    .split('\n')
    .reduce((acc, line) => {
      const [key, value] = line.split('=');
      if (key) acc[key] = value || '';
      return acc;
    }, {});
  
  // 修改变量的值
  envObject[targetVariable] = newValue;
  
  // 3. 将修改后的内容写回.env文件
  const newEnvContent = Object.entries(envObject)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  
  fs.writeFileSync(envFilePath, newEnvContent, 'utf-8');
}