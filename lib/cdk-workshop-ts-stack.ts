import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { HitCounter } from './hitcounter';

import { Construct } from 'constructs';

export class CdkWorkshopTsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'hello.handler'
    });

    // NOTE: helloWithCounter acts as middleware for hello.handler lambda 
    // Whenever endpoint is hit, API Gateway will route the request to 
    // this handler, which will log the hit and relay it over to the 
    // 'hello' function
    const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
      downstream: hello  // prop - lambda/hello.handler
    });

    // defines an API Gateway REST API resource backed by our "hello" function 
    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: helloWithCounter.handler
    });



 
  }
}
