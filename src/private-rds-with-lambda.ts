import { App, Stack, StackProps } from 'aws-cdk-lib';
import {
  Role,
  ServicePrincipal,
  ManagedPolicy,
} from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { Lambda } from './index';

export class PrivateRDSWithLambda extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const lambdaRole = new Role(this, 'lambdaRole', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          'service-role/AWSLambdaBasicExecutionRole',
        ),
      ],
    });

    new Lambda(this, 'Lambda', {
      role: lambdaRole,
    });
  }
}

const prodEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new PrivateRDSWithLambda(app, 'private-rds-with-lambda', { env: prodEnv });

app.synth();
