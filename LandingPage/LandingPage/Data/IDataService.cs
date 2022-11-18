namespace LandingPage.Data
{
    /// <summary>
    /// Interface que gerencia a criação do banco de dados
    /// </summary>
    public interface IDataService
    {
        /// <summary>
        /// Tarefa que inicializa o banco de dados com as informações de migration atuais
        /// </summary>
        /// <returns></returns>
        Task InitDb();
    }
}
