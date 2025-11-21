package in.bushansirgur.billingsoftware.service;

import com.razorpay.RazorpayException;
import in.bushansirgur.billingsoftware.io.RazorpayOrderResponse;

public interface RazorpayService {

    RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;
}
