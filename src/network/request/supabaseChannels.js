import supabase from "./supabase.js";
import { playSound } from "../../utils/sound.js";

export const orderInsertChannel = (refetch) => {
  const channel = supabase
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "order",
      },
      () => {
        playSound.alert();
        refetch();
      },
    )
    .subscribe();

  return channel;
};

export const orderUpdateChannel = (refetch) => {
  const channel = supabase
    .channel("schema-db-changes2")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "order",
      },
      () => {
        refetch();
      },
    )
    .subscribe();

  return channel;
};

export const orderDetailUpdateChannel = (refetch) => {
  const channel = supabase
    .channel("schema-db-changes3")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "order_detail",
      },
      () => {
        refetch();
      },
    )
    .subscribe();

  return channel;
};

export const orderInsertChannelState = (refetch) => {
  const channel = supabase
    .channel("schema-db-changes4")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "order",
      },
      () => {
        playSound.alert();
        refetch();
      },
    )
    .subscribe();

  return channel;
};

export const orderDetailUpdateChannelState = (refetch) => {
  const channel = supabase
    .channel("schema-db-changes5")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "order_detail",
      },
      () => {
        refetch();
      },
    )
    .subscribe();

  return channel;
};

export const unsubscribeChannel = (channels) => {
  channels.forEach((channel) => channel.unsubscribe());
};
