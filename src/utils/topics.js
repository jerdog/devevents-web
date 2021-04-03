// !!!
// Don't fotget to update topics in devevents-api
// !!!
const topics = {
  clojure: {
    name: "Clojure"
  },
  cpp: {
    name: "C/C++"
  },
  mobile: {
    name: "Mobile"
  },
  iot: {
    name: "Hardware/IoT"
  },
  api: {
    name: "API"
  },
  vue: {
    name: "Vue"
  },
  angular: {
    name: "Angular"
  },
  web: {
    name: "Web/Frontend"
  },
  data: {
    name: "Data science"
  },
  database: {
    name: "Databases"
  },
  devops: {
    name: "DevOps"
  },
  dotnet: {
    name: ".NET"
  },
  elixir: {
    name: "Elixir"
  },
  react: {
    name: "React"
  },
  fullstack: {
    name: "Full-stack"
  },
  golang: {
    name: "Golang"
  },
  java: {
    name: "Java"
  },
  kotlin: {
    name: "Kotlin"
  },
  scala: {
    name: "Scala"
  },
  javascript: {
    name: "JavaScript"
  },
  leadership: {
    name: "Leadership"
  },
  serverless: {
    name: "Serverless"
  },
  management: {
    name: "Management"
  },
  game: {
    name: "Game development"
  },
  architecture: {
    name: "Software architecture"
  },
  agile: {
    name: "Agile"
  },
  php: {
    name: "PHP"
  },
  oss: {
    name: "Open source"
  },
  product: {
    name: "Product development"
  },
  python: {
    name: "Python"
  },
  ruby: {
    name: "Ruby and Rails"
  },
  android: {
    name: "Android"
  },
  ios: {
    name: "iOS"
  },
  security: {
    name: "Security"
  },
  ux: {
    name: "UX"
  },
  qa: {
    name: "Testing and QA"
  },
  blockchain: {
    name: "Blockchain"
  },
  career: {
    name: "Career"
  },
  vr: {
    name: "AR/VR/XR"
  },
  cloud: {
    name: "Cloud"
  },
  docker: {
    name: "Docker"
  },
  k8s: {
    name: "Kubernetes"
  },
  fp: {
    name: "Functional programming"
  },
  fsharp: {
    name: "F sharp"
  },
  fintech: {
    name: "Fintech"
  },
  rust: {
    name: "Rust"
  },
  ml: {
    name: "Machine learning & AI"
  }
};

module.exports.topics = topics;
module.exports.topicsOrdered = Object.keys(topics)
  .map(code => ({ code: code, name: topics[code].name }))
  .sort((it, that) => it.name.localeCompare(that.name));
