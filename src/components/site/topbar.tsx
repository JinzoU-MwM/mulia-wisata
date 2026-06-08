import { COMPANY } from "@/lib/site";
import { Phone, Mail, MapPin } from "@/components/icons";

export function Topbar() {
  return (
    <div className="topbar">
      <div className="container">
        <span className="arabic">السلام عليكم ورحمة الله وبركاته</span>
        <div className="topbar-right">
          <span><Phone /> {COMPANY.phoneOffice}</span>
          <span><Mail /> {COMPANY.email}</span>
          <span><MapPin /> {COMPANY.city}</span>
        </div>
      </div>
    </div>
  );
}
