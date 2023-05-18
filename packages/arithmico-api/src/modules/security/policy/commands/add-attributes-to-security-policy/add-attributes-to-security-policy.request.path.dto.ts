import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AddAttributesToSecurityPolicyRequestPathDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  policyId: string;
}
