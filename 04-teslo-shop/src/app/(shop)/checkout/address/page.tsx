import { Title } from "@/components";
import { AddressForm } from "./ui/AddressForm";
import { getCountries } from "@/actions";
import { getUserAddress } from "@/actions/address/get-user-address";
import { auth } from "@/auth";

export default async function AddressPage() {
  const session = await auth();

  const countries = await getCountries();

  if (!session?.user) {
    return <h3 className="text-2xl text-center">No estas logueado</h3>;
  }
  const address = (await getUserAddress(session.user.id)) ?? undefined;

  // console.log(address);

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subTitle="Dirección de entrega" />
        <AddressForm countries={countries} userStoreAddress={address} />
      </div>
    </div>
  );
}
