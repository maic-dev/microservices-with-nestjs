import { IsNumber, IsString, IsPositive } from "class-validator";

export class CreateProductDto {

    @IsString()
    productName: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    productPrice: number;
}
