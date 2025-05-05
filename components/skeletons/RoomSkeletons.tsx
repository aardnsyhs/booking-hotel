import CardSkeletons from "./CardSkeletons";

const RoomSkeletons = () => {
  return (
    <div className="max-w-screen-xl py-6 pb-20 px-4 mx-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        <CardSkeletons />
        <CardSkeletons />
        <CardSkeletons />
        <CardSkeletons />
        <CardSkeletons />
        <CardSkeletons />
      </div>
    </div>
  );
};

export default RoomSkeletons;
