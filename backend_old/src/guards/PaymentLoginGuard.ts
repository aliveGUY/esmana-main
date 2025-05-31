import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RedisClient } from 'src/clients/RedisClient';

@Injectable()
export class PaymentLoginGuard implements CanActivate {
  constructor(private readonly redisClient: RedisClient) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // Get payment intent ID from request
    const paymentIntentId = request.query.paymentIntentId;

    if (!paymentIntentId) {
      response.status(400).json({
        success: false,
        message: 'Payment intent ID is required'
      });
      return false;
    }

    // Always use the hardcoded payment intent ID
    const userData = await this.redisClient.getPaymentIntentById(paymentIntentId);

    if (!userData) {
      response.status(404).json({
        success: false,
        message: 'Payment not found or not yet processed'
      });
      return false;
    }

    // Check if payment has succeeded
    if (userData.succeeded !== true) {
      response.status(400).json({
        success: false,
        message: 'Payment has not been confirmed yet'
      });
      return false;
    }

    return new Promise<boolean>((resolve) => {
      request.login(userData, async (err) => {
        if (err) {
          response.status(500).json({
            success: false,
            message: 'Failed to create session'
          });
          return resolve(false);
        }

        try {
          // Save the session
          await new Promise<void>((resolveSession, rejectSession) => {
            request.session.save((err) => {
              if (err) rejectSession(err);
              else resolveSession();
            });
          });

          // Save session data if needed
          if (request.sessionID) {
            await this.redisClient.saveSession(request.sessionID, userData);
          }

          // Remove payment data from Redis after successful login
          await this.redisClient.deletePaymentIntent(paymentIntentId);

          // Set success response
          response.status(200).json({
            success: true,
            message: 'Session created successfully',
            user: userData
          });

          resolve(false); // Return false to prevent further handler execution
        } catch (error) {
          response.status(500).json({
            success: false,
            message: 'Error processing payment session'
          });
          resolve(false);
        }
      });
    });
  }
}
