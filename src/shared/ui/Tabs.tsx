import React, { type FC } from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

interface LinkItem {
  id: number;
  title: string;
  path: string;
}

interface Props {
  links: LinkItem[];
}

const Tabs: FC<Props> = ({ links }) => {
  return (
    <div className="flex gap-4">
      {links.map((link: LinkItem) => (
        <NavLink
          end={true}
          key={link.id}
          className={"navigation-link  py-0.5 text-gray-500 relative"}
          to={link.path}
        >
          {link.title}
        </NavLink>
      ))}
    </div>
  );
};

export default React.memo(Tabs);
