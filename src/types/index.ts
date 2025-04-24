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
