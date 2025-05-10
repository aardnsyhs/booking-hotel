import { auth } from "@/auth";
import { prisma } from "./prisma";

export const getAmenities = async () => {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized Access");
  }

  try {
    const result = await prisma.amenities.findMany();
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const getRooms = async () => {
  try {
    const result = await prisma.room.findMany({
      orderBy: { createdAt: "desc" },
    });
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const getRoomById = async (roomId: string) => {
  try {
    const result = await prisma.room.findUnique({
      where: { id: roomId },
      include: { RoomAmenities: { include: { amenities: true } } },
    });
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const getRoomDetailById = async (roomId: string) => {
  try {
    const result = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        RoomAmenities: {
          include: {
            amenities: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const getReservationById = async (id: string) => {
  try {
    const result = await prisma.reservation.findUnique({
      where: { id },
      include: {
        room: {
          select: {
            name: true,
            image: true,
            price: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        Payment: true,
      },
    });
    return result;
  } catch (err) {
    console.error(err);
  }
};
