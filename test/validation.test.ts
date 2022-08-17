import  cdk = require('aws-cdk-lib');
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { HitCounter } from '../lib/hitcounter';
 

test('read capacity can be configured', () => {
    const stack = new cdk.Stack();
    
    expect(() => {
        new HitCounter(stack, 'MyTestConstruct', {
            downstream: new lambda.Function(stack, 'TestFunction', {
                runtime: lambda.Runtime.NODEJS_14_X, 
                handler: 'hello.handler', 
                code: lambda.Code.fromAsset('lambda')
            }),
            readCapacity: 5
        });
    }).toThrowError(/readCapacity must be greater than 5 and less than 20/);
});