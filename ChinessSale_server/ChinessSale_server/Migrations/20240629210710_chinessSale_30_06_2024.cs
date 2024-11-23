using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChinessSaleserver.Migrations
{
    /// <inheritdoc />
    public partial class chinessSale30062024 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Gifts",
                newName: "image");

            migrationBuilder.AddColumn<string>(
                name: "image",
                table: "Managers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "image",
                table: "Gifts",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(max)");

            migrationBuilder.AddColumn<string>(
                name: "image",
                table: "Donors",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "image",
                table: "Customers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "image",
                table: "Managers");

            migrationBuilder.DropColumn(
                name: "image",
                table: "Donors");

            migrationBuilder.DropColumn(
                name: "image",
                table: "Customers");

            migrationBuilder.RenameColumn(
                name: "image",
                table: "Gifts",
                newName: "Image");

            migrationBuilder.AlterColumn<byte[]>(
                name: "Image",
                table: "Gifts",
                type: "varbinary(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }
    }
}
