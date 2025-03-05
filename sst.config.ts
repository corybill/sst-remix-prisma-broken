/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return { name: "SSTRemixPrismaBroken", removal: "remove", home: "aws" };
  },
  async run() {
    const vpc = new sst.aws.Vpc(`${$app.name}Vpc`, { bastion: true, nat: "ec2" });

    const rds = new sst.aws.Postgres("Store", { vpc });

    const DATABASE_URL = $interpolate`postgresql://${rds.username}:${rds.password}@${rds.host}:${rds.port}/${rds.database}`;

    new sst.x.DevCommand("Prisma", {
      environment: { DATABASE_URL },
      dev: {
        autostart: false,
        command: "npx prisma studio",
      },
    });

    // DEBUG: "prisma:client,prisma:engine"
    let environment = { DATABASE_URL, DEBUG: "prisma:client,prisma:engine"};

    new sst.aws.Remix(`${$app.name}Ui`, {
      environment,
      link: [rds],
      vpc
    });
  }
});
