import { Association, DataTypes, Model } from "sequelize";
import { sequelize } from "..";
import Skills from "./Skills.model";
import IProfileDto from "../../dto/models/Profile/ProfileDto";

class Profile extends Model<IProfileDto> {
  public id: string;

  public userId: string;

  public jobGroup: string;

  public aboutMe: string;

  public picture: string;

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
    picture: {
      type: DataTypes.STRING,
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
  foreignKey: "profileId",
});
Skills.belongsToMany(Profile, {
  through: ProfileSkills,
  foreignKey: "skillsId",
});
export default Profile;
