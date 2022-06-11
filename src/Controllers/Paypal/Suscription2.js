import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import {
	PayPalScriptProvider,
	PayPalButtons,
	usePayPalScriptReducer
} from "@paypal/react-paypal-js";

const ButtonWrapper = ({ type }) => {
	const [{ options }, dispatch] = usePayPalScriptReducer();
	const user = useSelector((state) => state.userReducer.user);
	
	useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                intent: "subscription",
            },
        });
    }, [type]);

	return (<PayPalButtons
		createSubscription={(data, actions) => {
			return actions.subscription.create({
					plan_id: "P-5L906134PJ404612UMKODUUI",
				})
				.then((orderId) => {
					// Your code here after create the order
                    console.log(orderId)
					return orderId;
				});						
			}			
		}
		onApprove={async (data, actions) => {
			console.log("Has creado una suscripción exitosamente" + data.subscriptionID);
			axios
                  .get(`http://localhost:3001/payment/suscription-detail/${data.subscriptionID}`)
                  .then((response) => {
					console.log(response.data)
					console.log(actions)
					const r= response.data
					const obj = {};					
						obj.id = r.id;
						obj.first_name = r.subscriber.name.given_name;
						obj.last_name = r.subscriber.name.surname;
						obj.payer_Id = r.subscriber.payer_id;
						obj.amount = r.billing_info.last_payment.amount.value;
						obj.cycles_completed = r.billing_info.cycle_executions[0].cycles_completed;
						obj.cycles_remaining = r.billing_info.cycle_executions[0].cycles_remaining;
						obj.sequence = r.billing_info.cycle_executions[0].sequence;
						obj.tenure_type = r.billing_info.cycle_executions[0].tenure_type;
						obj.total_cycles = r.billing_info.cycle_executions[0].total_cycles;
						obj.failed_payments_count = r.billing_info.failed_payments_count;
						obj.last_payment_time = r.billing_info.last_payment.time;
						obj.next_billing_time = r.billing_info.next_billing_time;
						obj.create_time = r.create_time;
						obj.plan_Id = r.plan_id;
						obj.plan_overridden = r.plan_overridden;
						obj.quantity =r.quantity;
						obj.start_time = r.start_time;
						obj.status = r.status;
						obj.status_update_time = r.status_update_time; 
						obj.email_address = r.subscriber.email_address;
						let userId = user.id;
	
					 	axios.post(`http://localhost:3001/orders/${userId}`, obj)
						.then((response) => {
							console.log(response)
							Swal.fire(
							"Aviso!",
							`Donación realizada, muchas gracias.`,
							"success"
							);
						})	                   
                  })
                  .catch((error) => {
                    console.log(error);
                  });
		}}	
		
		style={{
			label: "subscribe",
		}}
	/>);
}
export default ButtonWrapper;

