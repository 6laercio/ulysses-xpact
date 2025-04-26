/**
 * Interface para armazenar informações de site bloqueado
 */
export interface BlockedSite {
  domain: string;
  startTime: number;
  endTime: number;
}

/**
 * Interface para o estado global de sites bloqueados
 */
export interface BlockedSitesState {
  [domain: string]: BlockedSite;
}

/**
 * Interface para mensagens de bloqueio de site
 */
export interface BlockSiteMessage {
  action: 'blockSite';
  domain: string;
  duration: number;
}

/**
 * Interface para mensagens de obtenção de sites bloqueados
 */
export interface GetBlockedSitesMessage {
  action: 'getBlockedSites';
}

/**
 * Tipo para todas as mensagens possíveis
 */
export type Message = BlockSiteMessage | GetBlockedSitesMessage;

/**
 * Interface para respostas de sucesso
 */
export interface SuccessResponse<T> {
  success: true;
  data: T;
}

/**
 * Interface para respostas de erro
 */
export interface ErrorResponse {
  success: false;
  error: string;
}

/**
 * Tipo para todas as respostas possíveis
 */
export type Response<T> = SuccessResponse<T> | ErrorResponse;

export interface BlockSiteResponse {
  success: boolean;
  error?: string;
}
