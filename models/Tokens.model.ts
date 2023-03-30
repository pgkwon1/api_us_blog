import { Model, DataTypes } from "sequelize";
import ITokensDto from "../dto/TokensDto";
import { sequelize } from ".";
class Tokens extends Model<ITokensDto> {
  public id: string;

  public userId: string;

  public accessToken: string;

  public refreshToken: string;

  public readonly createdAt;

  public readonly updateAt;
}

Tokens.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    accessToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "Tokens",
    tableName: "Tokens",
    sequelize,
    timestamps: false,
  }
);

export default Tokens;
