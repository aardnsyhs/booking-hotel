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

export const getDashboardStats = async () => {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized Access");
  }

  try {
    const totalRooms = await prisma.room.count();
    const totalReservations = await prisma.reservation.count();
    const totalRevenue = await prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: "paid" },
    });
    const pendingPayments = await prisma.payment.count({
      where: { status: "unpaid" },
    });

    return {
      totalRooms,
      totalReservations,
      totalRevenue: totalRevenue._sum.amount || 0,
      pendingPayments,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getRecentReservations = async (limit: number = 5) => {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized Access");
  }

  try {
    const result = await prisma.reservation.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        room: {
          select: {
            name: true,
            image: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        Payment: {
          select: {
            status: true,
            amount: true,
          },
        },
      },
    });
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
