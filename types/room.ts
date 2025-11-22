import { Prisma } from "@prisma/client";

export type RoomProps = Prisma.RoomGetPayload<{
  include: { RoomAmenities: { select: { Amenities: true } } };
}>;

export type RoomDetailProps = Prisma.RoomGetPayload<{
  include: {
    RoomAmenities: {
      include: {
        Amenities: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}>;
