import { Body, Controller, Param, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RenameSecurityPolicyCommand } from './rename-security-policy.command';
import { RenameSecurityPolicyRequestBodyDto } from './rename-security-policy.request.body.dto';
import { RenameSecurityPolicyRequestPathDto } from './rename-security-policy.request.path.dto';
import { RenameSecurityPolicyResponseDto } from './rename-security-policy.response.dto';

@Controller(':policyId/name')
export class RenameSecurityPolicyController {
  constructor(private commandBus: CommandBus) {}

  @Put()
  async renameSecurityPolicy(
    @Param() params: RenameSecurityPolicyRequestPathDto,
    @Body() body: RenameSecurityPolicyRequestBodyDto,
  ): Promise<RenameSecurityPolicyResponseDto> {
    return this.commandBus.execute(
      new RenameSecurityPolicyCommand(params.policyId, body.name),
    );
  }
}