"use client";
import { useQueryStates } from "next-usequerystate";

import OrderItem from "@/components/modules/Orders/OrderItem/OrderItem";
import Select from "@/components/ui/Select/Select";
import PageSpinner from "@/components/ui/PageSpinner/PageSpinner";

import { useFetchOrders } from "@/hooks/orders/useFetchOrders";
import { useQueryParams } from "@/hooks/use-query-params";

import {
  EOrdersParamsKeys,
  EOrderSortStatuses,
  type IFetchOrdersParams
} from "@/interfaces/orders.interface";

import styles from "./Orders.module.scss";

type SortOption = {
  text: string;
  value: EOrderSortStatuses;
};

const sortOptions = [
  { text: "All", value: EOrderSortStatuses.ALL },
  { text: "Pending", value: EOrderSortStatuses.PENDING },
  { text: "Payed", value: EOrderSortStatuses.PAYED },
  { text: "Canceled", value: EOrderSortStatuses.CANCELED }
];

const initOrdersParamsObj = {
  status: EOrdersParamsKeys.STATUS
};

type TInitOrdersParamsObj = typeof initOrdersParamsObj;

const Orders = () => {
  const { updateQueryParams, queryParams } =
    useQueryParams<TInitOrdersParamsObj>(initOrdersParamsObj);
  const fetchOrders = useFetchOrders(queryParams);

  const onSortOrders = (
    sortBy: keyof IFetchOrdersParams,
    value: EOrderSortStatuses
  ) => {
    updateQueryParams(sortBy, value);
  };

  const defaultSortOption = sortOptions.find(o => o.value === queryParams.status);

  return (
    <>
      <PageSpinner
        minDisplay={200}
        appearenceDelay={200}
        isLoading={fetchOrders.isLoading}
      />

      <div className={styles["orders"]}>
        <div className={styles["heading"]}>
          <h3>Orders</h3>
          <Select
            title="Sort by:"
            defaultOption={defaultSortOption ?? sortOptions[0]}
            options={sortOptions}
            onChange={(value: EOrderSortStatuses) =>
              onSortOrders(EOrdersParamsKeys.STATUS, value)
            }
          />
        </div>

        {fetchOrders.orders && !fetchOrders.orders.length && (
          <p>you have no orders</p>
        )}

        {fetchOrders.orders &&
          !!fetchOrders.orders.length &&
          fetchOrders.orders.map(order => (
            <OrderItem showOrderDetails={true} key={order.id} order={order} />
          ))}
      </div>
    </>
  );
};

export default Orders;
