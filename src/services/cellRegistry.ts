// src/services/cellRegistry.ts
import { Cell, CellConfig, CellAction, CellResult } from '../types/cell';
import { TokenFactoryService, tokenFactory, SOCIAL_TOKENS } from './tokenFactory';

export class CellRegistry {
  private cells: Map<string, Cell> = new Map();
  private tokenFactory: TokenFactoryService;

  constructor(tokenFactory: TokenFactoryService) {
    this.tokenFactory = tokenFactory;
  }

  /**
   * Registra una nueva celda en el sistema
   */
  register(cell: Cell): void {
    const cellId = this.generateCellId(cell.config);
    this.cells.set(cellId, cell);
    console.log(`✅ Cell registered: ${cellId}`);
  }

  /**
   * Ejecuta una celda específica
   */
  async execute(cellId: string, action: CellAction): Promise<CellResult> {
    const cell = this.cells.get(cellId);
    
    if (!cell) {
      throw new Error(`Cell not found: ${cellId}`);
    }

    try {
      // Validar la acción si existe validador
      if (cell.validate && !cell.validate(action)) {
        throw new Error(`Invalid action for cell: ${cellId}`);
      }

      // Ejecutar la celda
      const result = await cell.execute(action);

      // Si la ejecución fue exitosa, generar tokens
      if (result.success && cell.config.tokenRewards.length > 0) {
        const tokens = await this.tokenFactory.generateTokens(
          cell.config.tokenRewards,
          action.metadata?.userId || '',
          cellId
        );
        result.tokens = tokens;
      }

      // Ejecutar callback de éxito
      if (cell.onSuccess) {
        cell.onSuccess(result);
      }

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      // Ejecutar callback de error
      if (cell.onError) {
        cell.onError(errorMessage);
      }

      return {
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Obtiene una celda por ID
   */
  getCell(cellId: string): Cell | undefined {
    return this.cells.get(cellId);
  }

  /**
   * Lista todas las celdas registradas
   */
  listCells(): Cell[] {
    return Array.from(this.cells.values());
  }

  /**
   * Busca celdas por plataforma
   */
  getCellsByPlatform(platform: string): Cell[] {
    return this.listCells().filter(cell => 
      cell.config.platform === platform
    );
  }

  /**
   * Busca celdas por módulo
   */
  getCellsByModule(module: string): Cell[] {
    return this.listCells().filter(cell => 
      cell.config.module === module
    );
  }

  /**
   * Genera ID único para la celda basado en su configuración
   */
  private generateCellId(config: CellConfig): string {
    return `${config.platform}.${config.module}.${config.action}.${config.type}.${config.version}`;
  }
}

export const cellRegistry = new CellRegistry(tokenFactory);

export { SOCIAL_TOKENS, tokenFactory };

