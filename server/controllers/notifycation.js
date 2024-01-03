const amqp = require('amqplib');


exports.sendPaymentSuccessMessageToRabbitMQ=async(message)=> {
    try {
      const connection = await amqp.connect('amqp://localhost');
      const channel = await connection.createChannel();
  
      const queueName = 'payment-success-queue';
      await channel.assertQueue(queueName, { durable: false });
  
        // Đặt TTL cho tin nhắn (ví dụ: 1 ngày)
        const ttlInMilliseconds = 24 * 60 * 60 * 1000; // 1 ngày
        const options = { expiration: ttlInMilliseconds.toString() };
      // Gửi thông điệp (message) vào hàng đợi
      channel.sendToQueue(queueName, Buffer.from(`${message}`,options));
  
      // Đóng kênh và kết nối
      await channel.close();
      await connection.close();
    } catch (error) {
      console.error('Error sending payment success message to RabbitMQ:', error);
    }
  }


 exports.consumePaymentSuccessMessages=async()=> {
    try {
      const connection = await amqp.connect('amqp://localhost');
      const channel = await connection.createChannel();
  
      const queueName = 'payment-success-queue';
      await channel.assertQueue(queueName, { durable: false });
  
      // Lấy tất cả các tin nhắn từ hàng đợi
      const messages = await new Promise((resolve) => {
        const collectedMessages = [];
  
        channel.consume(queueName, (msg) => {
          if (msg !== null) {
            // Xác nhận đã xử lý tin nhắn
            channel.ack(msg);
            collectedMessages.push(msg.content.toString());
          }
        });
  
        // Sau một khoảng thời gian, giả sử 5 giây, resolve với danh sách tin nhắn
        setTimeout(() => {
          resolve(collectedMessages);
        }, 100);
      });
  
      // Đóng kênh và kết nối
      await channel.close();
      await connection.close();
  
      return messages;
    } catch (error) {
      console.error('Error consuming payment success messages from RabbitMQ:', error);
      throw error;
    }
  }