import path from 'path';
import { Duration } from 'aws-cdk-lib';
import { Role } from 'aws-cdk-lib/aws-iam';
import { Function, Code, Runtime, Architecture } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

interface LambdaProps {
  role: Role;
}
export class Lambda extends Construct {
  public queryLambda: Function;

  constructor(scope: Construct, id: string, props: LambdaProps) {
    super(scope, id);

    this.queryLambda = new Function(this, 'QueryLambda', {
      code: Code.fromAsset(path.join(__dirname, 'resources/sample_lambda'), {
        bundling: {
          image: Runtime.PYTHON_3_9.bundlingImage,
          command: [
            'bash',
            '-c',
            'pip install -r requirements.txt -t /asset-output && cp -au . /asset-output',
          ],
        },
      }),
      runtime: Runtime.PYTHON_3_9,
      architecture: Architecture.X86_64,
      handler: 'index.lambda_handler',
      timeout: Duration.minutes(5),
      role: props.role,
    });
  }
}
