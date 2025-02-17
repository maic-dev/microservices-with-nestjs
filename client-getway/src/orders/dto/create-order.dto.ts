import { IsBoolean, IsNumber } from "class-validator";

export class CreateOrderDto {

    @IsNumber()
    totalAmount: number;

    @IsNumber()
    totalItems: number;

    @IsBoolean()
    paid: boolean = false;
}
