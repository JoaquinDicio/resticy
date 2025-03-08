import axios from "axios";

export default async function createPreference(
  items,
  external_reference,
  callback
) {
  const formatedItems = [];

  items.forEach((item) => {
    formatedItems.push({ ...item, unit_price: parseInt(item.price) });
  });

  const { data } = await axios.post(
    "https://resticy-production.up.railway.app/payment/create-preference",
    { items: formatedItems, external_reference }
  );

  if (callback) callback();

  return data;
}
