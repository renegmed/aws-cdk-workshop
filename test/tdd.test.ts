import { Template, Capture } from 'aws-cdk-lib/assertions';
import  cdk = require('aws-cdk-lib');
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { HitCounter } from '../lib/hitcounter';

test('DynamoDB Table Created With Encryption', () => {
    const stack = new cdk.Stack();

    // WHEN
    new HitCounter(stack, 'MyTestConstruct', {
        downstream: new lambda.Function(stack, 'TestFunction', {
            runtime: lambda.Runtime.NODEJS_14_X, 
            handler: 'hello.handler', 
            code: lambda.Code.fromAsset('lambda')
        })
    });
    //THEN
    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::DynamoDB::Table', {
        SSESpecification: {
            SSEEnabled: true
        }
    });
});