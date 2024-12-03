import { IsBoolean } from "class-validator";


export class CreateOwnerDto {
    
    @IsBoolean()
    isActive: boolean;

}
