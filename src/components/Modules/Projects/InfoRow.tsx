import Copy from "@/components/copy/Copy";

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => {
  return (
    <div className="grid grid-cols-[180px_1fr] gap-4 py-4 border-b border-gray-200 last:border-b-0">
      <Copy>
        <h3 className="text-gray-800 text-md">{label}</h3>
      </Copy>
      <Copy>
        <h3 className="text-gray-800 text-md">{value}</h3>
      </Copy>
    </div>
  );
};

export default InfoRow;
