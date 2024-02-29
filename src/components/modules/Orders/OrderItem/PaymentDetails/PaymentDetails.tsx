import Link from 'next/link'
import Button, { EButtonVariants } from "@/components/ui/Button/Button";

import { type IOrder } from "@/interfaces/orders.interface";

import styles from "./PaymentDetails.module.scss";

type Props = {
  order: IOrder;
  isLoadingCancelOrder: boolean;
  onCancelOrder: () => void;
};

const PaymentDetails = ({
  order,
  isLoadingCancelOrder,
  onCancelOrder
}: Props) => {
  return (
    <div className={`${styles["payment-details"]} bg-white`}>
      <h3 className={styles["title"]}>
        To pay <span>${order.amount}</span>
      </h3>
      <p className={styles["products-quantity"]}>
        30 item <span>${order.amount}</span>
      </p>
      <p className={styles["vat"]}>
        VAT 20% <span>$5</span>
      </p>
      <p className={styles["delivery"]}>
        Delivery <span>free</span>
      </p>

      <div className={styles["order-controls"]}>
        <Button
          text="Cancel order"
          variant={EButtonVariants.Danger}
          onClick={onCancelOrder}
          loading={isLoadingCancelOrder}
          disabled={isLoadingCancelOrder}
        />

        {order.paymentUrl && (
          <Link
            className={`${styles["payment-link"]} btn-secondary`}
            href={order.paymentUrl}
          >
            Pay order
          </Link>
        )}
      </div>
    </div>
  );
};

export default PaymentDetails;
