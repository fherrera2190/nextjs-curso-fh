import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = initialData.products.slice(0, 3);

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={"Verificar Orden"} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar elementos</span>
            <Link className="underline mb-5" href="/cart">
              Editar carrito
            </Link>
            {/* items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  alt={product.title}
                  className="mr-5 rounded"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
                <div>
                  <p>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          {/* checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7 ">
            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">John Doe</p>
              <p>123 Main St</p>
              <p>Col. Centro</p>
              <p>Alcaldia de Nemesis</p>
              <p>Ciudad de Nemesis</p>
              <p>CP: 00000</p>
              <p>Phone: 0000000000</p>
            </div>
            {/* Divider */}
            <div className="w-ful h-0.5 rounded bg-gray-200 mb-10"></div>
            <h2 className="text-2xl mb-2">Resume de orden</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right ">3 articulos</span>

              <span>Subtotal</span>
              <span className="text-right ">100</span>

              <span>Impuestos (15%)</span>
              <span className="text-right ">$100</span>

              <span className="text-2xl mt-5">Total:</span>
              <span className="text-2xl mt-5 ">3 articulos</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <p className="mb-5">
                {/* Disclaimer */}
                <span className="text-xs">
                  Al hacer click en {'"Colocar orden"'}, aceptas nuestros
                  <a href="#" className="underline">
                    {" "}
                    términos y condiciones
                  </a>
                  {" y "}
                  <a href="#" className="underline">
                    política de privacidad
                  </a>
                </span>
              </p>
              <Link
                className="flex btn-primary justify-center"
                href="/orders/123"
              >
                Colocar orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
