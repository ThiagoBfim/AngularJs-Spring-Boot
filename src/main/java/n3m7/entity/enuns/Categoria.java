package n3m7.entity.enuns;

public enum Categoria {


	PARTICULAR("Particular"), ALUGUEL("Aluguel"), OFICIAL("Oficial");

	private String descricao;

	Categoria(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return descricao;
	}
	
	@Override
	public String toString() {
		return getDescricao();
	}
}
