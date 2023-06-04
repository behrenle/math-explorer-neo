export interface GetSecurityPoliciesResponseDto {
  id: string;
  name: string;
  attributes: string[];
  principals: number;
}

export interface GetSecurityPolicyByIdResponseDto {
  id: string;
  name: string;
  attributes: string[];
  principals: {
    total: number;
    users: number;
    groups: number;
  };
}

export interface GetSecurityPoliciesArgs {
  skip: number;
  limit: number;
}

export interface GetSecurityPolicyByIdArgs {
  policyId: string;
}
