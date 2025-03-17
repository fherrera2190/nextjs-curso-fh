import { getOrderById } from "@/actions";
import { PaypalButton, Title } from "@/components";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import { redirect } from "next/navigation";
import { PaymentStatus } from "./ui/PaymentStatus";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: Props) {
  const { id } = await params;

  const { ok, order } = await getOrderById(id);

  if (!ok) redirect("/");

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id.split("-")[0]}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* carrito */}
          <div className="flex flex-col mt-5">
            <PaymentStatus isPaid={order?.isPaid} />
            {/* items */}
            {order?.OrderItem.map((item) => (
              <div key={item.product.slug + item.size} className="flex mb-5">
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  alt={item.product.title}
                  className="mr-5 rounded"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
                <div>
                  <p>{item.size + " - " + item.product.title}</p>
                  <p>
                    ${item.price} x {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: {currencyFormat(item.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7 ">
            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">
                {order?.OrderAddress?.firstname +
                  " " +
                  order?.OrderAddress?.lastname}
              </p>
              <p>{order?.OrderAddress?.address}</p>
              <p>
                {order?.OrderAddress?.address2}, {order?.OrderAddress?.city}
              </p>
              <p>{order?.OrderAddress?.postalCode}</p>
              <p>
                {order?.OrderAddress?.city}, {order?.OrderAddress?.countryId}
              </p>
              <p>{order?.OrderAddress?.phone}</p>
            </div>
            {/* Divider */}
            <div className="w-ful h-0.5 rounded bg-gray-200 mb-10"></div>
            <h2 className="text-2xl mb-2">Resume de orden</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right ">
                $
                {order?.itemsInOrder === 1
                  ? "1 articulo"
                  : `${order?.itemsInOrder} articulos`}
              </span>

              <span>Subtotal</span>
              <span className="text-right ">
                {currencyFormat(order!.subTotal)}
              </span>

              <span>Impuestos (15%)</span>
              <span className="text-right ">{currencyFormat(order!.tax)}</span>

              <span className="text-2xl mt-5">Total:</span>
              <span className="text-2xl text-right mt-5 ">
                {currencyFormat(order!.total)}
              </span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {order?.isPaid ? (
                <PaymentStatus isPaid={order?.isPaid} />
              ) : (
                <PaypalButton orderId={id} amount={order!.total} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
