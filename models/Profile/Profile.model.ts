import { Association, DataTypes, Model } from "sequelize";
import { sequelize } from "..";
import Skills from "./Skills.model";

interface IProfileDto {
  id: string;
  userId: string;
  jobGroup: string;
  aboutMe: string;
}
class Profile extends Model<IProfileDto> {
  public id: string;

  public userId: string;

  public jobGroup: string;

  public aboutMe: string;

  public static association: {
    profileSkills: Association<Profile, Skills>;
  };
}

Profile.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.UUID,
      unique: true,
    },

    jobGroup: {
      type: DataTypes.STRING,
    },

    aboutMe: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "Profile",
    modelName: "Profile",
    sequelize,
    timestamps: false,
  }
);

export const ProfileSkills = sequelize.define(
  "ProfileSkills",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    profileId: {
      type: DataTypes.UUID,
    },
    skillsId: {
      type: DataTypes.UUID,
    },
  },
  {
    timestamps: false,
  }
);
Profile.belongsToMany(Skills, {
  through: ProfileSkills,
});

export default Profile;
