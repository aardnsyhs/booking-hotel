import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  bgColor: string;
  iconBgColor: string;
}

const StatCard = ({ title, value, icon, bgColor, iconBgColor }: StatCardProps) => {
  return (
    <div className={`${bgColor} rounded-sm shadow-lg p-6 transition duration-200 hover:shadow-xl`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
        </div>
        <div className={`${iconBgColor} p-4 rounded-full`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
