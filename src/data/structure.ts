/**
 * Antonio Batista - MVP Nexo Institucional - 26/03/2026
 * Este arquivo carrega a estrutura de dados do organograma a partir do arquivo JSON centralizado.
 */
import { StructureData } from "../../types";
import data from "../../data/structure.json";

export const structureData: StructureData = data as StructureData;
