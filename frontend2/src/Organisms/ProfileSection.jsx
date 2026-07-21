// src/components/ProfileSection.jsx
import React from "react";
import ProfileInfo from "../Molecules/ProfileInfo"; // ProfileInfo component

const ProfileSection = ({ basicInfo, profileScore }) => {
  return (
    <div className="mb-6">
      <ProfileInfo basicInfo={basicInfo} profileScore={profileScore} />
    </div>
  );
};

export default ProfileSection;
